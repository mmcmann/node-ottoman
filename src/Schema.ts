abstract class SchemaField {
  public name = "";
  public type = null;
  public readonly = false;
  public default = undefined;
  public validator = null;
}

abstract class SchemaIndex {
  public type = null;
  public schema = null;
  public fields = [];
}

class RefDocIndex extends SchemaIndex {
  type = "refdoc";
}

class ListField {
  type: string;
}

class FieldGroup {
  fields: string[];
}

export class Schema {
  readonly context = null; // type Ottoman
  readonly name = "";
  readonly fields = [];
  readonly idField = "";
  readonly indices = [];
  readonly indexFns = [];
  readonly queryFns = [];
  readonly preHandlers = {};
  readonly postHandlers = {};

  /**
   * Schema handler class.
   */
  constructor(context: string) {
    this.context = context;
  }

  applyDefaultsToObject = function(obj) {
    for (var i = 0; i < this.fields.length; ++i) {
      var field = this.fields[i];

      if (field.type instanceof FieldGroup) {
        obj[field.name] = field.type.create();
      } else if (field.type instanceof ListField) {
        obj[field.name] = [];
      } else {
        if (field.default instanceof Function) {
          obj[field.name] = field.default();
        } else if (field.default !== undefined) {
          obj[field.name] = field.default;
        }
      }
    }
  };
}
