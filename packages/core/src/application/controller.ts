export abstract class Controller {
  /**
   * Called before controller action executes.
   * Can be overridden.
   */
  async before(): Promise<void> {}

  /**
   * Called after controller action executes.
   */
  async after(): Promise<void> {}
}
