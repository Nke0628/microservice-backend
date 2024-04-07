export class User {
  private id: number;
  private name: string;

  public constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  get getId(): number {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }
}
