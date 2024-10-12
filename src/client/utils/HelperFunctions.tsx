export function toB64(bytes: Uint8Array): string {
  return Buffer.from(bytes).toString("base64");
}

export function fromB64(base64String: string): Uint8Array {
  return new Uint8Array(Buffer.from(base64String, "base64"));
}
