interface ModelData {
  key: string;
  data: string;
  cas: string;
}

interface ModelRefData {
  key: string;
}

export class Model {
  readonly schema: string;
  readonly key: string | null = null;
  readonly cas: string | null = null;
  readonly loaded: boolean = false;
  readonly refKeys: string[] = [];

  constructor(data?: Partial<ModelData>) {
    if (data) {
      this.key = data.key;
      Model.applyData(this, data);
    } else {
      this.schema.applyDefaultsToObject(this);
      if (args.length === 1 && args[0] instanceof Object) {
        this.schema.applyUserDataToObject(this, args[0]);
      }
      this.schema.applyPropsToObj(this);
      this.loaded = true;
    }
  }
  static applyData(model: ModelInstance, data: Partial<ModelData>) {
    if (model.key !== null && model.key !== data.key) {
      throw new Error("Tried to load data from wrong id.");
    }
    model.key = data.key;
    model.schema.applyDataToObject(mdlInst, data.data);
    model.cas = data.cas;
    model.loaded = true;
    model.refKeys = model.schema.refKeys(mdlInst);
  }
}
