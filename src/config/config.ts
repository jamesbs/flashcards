import { Injectable } from '@angular/core'
import { ConfigDataSource } from './config-data-source'

@Injectable()
export class Config {
  constructor(public data: ConfigDataSource) { }
}
