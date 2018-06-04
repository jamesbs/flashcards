import { Injectable } from '@angular/core'
import { ConfigDataSource } from './config-data-source'

@Injectable({ providedIn: 'root' })
export class Config {
  constructor(public data: ConfigDataSource) { }
}
