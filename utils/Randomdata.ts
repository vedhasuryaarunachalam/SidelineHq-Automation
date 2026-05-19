export class TestDataUtil {

    static randomText(length: number) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

    static randomAlphaNumeric(length: number): string {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        return Array.from({ length }, () =>
            chars.charAt(Math.floor(Math.random() * chars.length))
        ).join('');
    }

    static equipmentData() {
        return {
            category: `Helmet${this.randomText(5)}`,
            productId: `PID-${this.randomAlphaNumeric(8)}`,
            brand: `Nike-${this.randomText(4)}`,
            style: `AirMax-${this.randomText(6)}`
        };
    }
}