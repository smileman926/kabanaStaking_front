export function makeAddressShort(address: string, length = 4) {
  return `${address.substring(0, length + 2)}…${address.substring(
    address.length - length
  )}`;
}
