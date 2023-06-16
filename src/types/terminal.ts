export type TerminalType =
  | string
  | number
  | bigint
  | boolean
  | null
  | undefined
  | void
  | any[]
  | Map<any, any>
  | Set<any>
  | Date
  | RegExp
  | AbortController
  | ((...args: any) => any);
