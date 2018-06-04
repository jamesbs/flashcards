import { Injectable, InjectionToken } from '@angular/core'

export type Config = { [key: string]: any }

export const Config = new InjectionToken('config')
