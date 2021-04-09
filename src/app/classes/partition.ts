import {PartitionInterval} from './partitionInterval';
import {Pipe, Injectable, PipeTransform} from '@angular/core';

export class Partition {
  // Constructor
  constructor(
    public topic: string,
    public partition: number,
    public status: string,
    public owner: string,
    public client_id: string,
    public start: PartitionInterval,
    public end: PartitionInterval
  ) {

  }

  get isError(): boolean {
    return this.status === 'ERR';
  }

  get isWarning(): boolean {
    return this.status !== 'ERR' && this.status !== 'OK';
  }

  get isOkay(): boolean {
    return this.status === 'OK';
  }
}

// This is used for filtering partition results
@Pipe({
  name: 'partitionFilter',
  pure: false
})

@Injectable()
export class PartitionFilterPipe implements PipeTransform {
  transform(items: Partition[], args: any[]): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.sort((a, b) => (a.topic + a.owner + a.client_id).localeCompare(b.topic + b.owner + b.client_id))
      .filter(item => args.indexOf(item.status) !== -1);
  }
}
