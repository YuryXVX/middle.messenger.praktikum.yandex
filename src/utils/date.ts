export class DateLib {
  static timeString(rawDate: string) {
    const date = new Date(rawDate);

    return date.toLocaleTimeString();
  }
}
