const joiParams = [
  { field: 'ids', items: Jod.object().keys().required().data },
  { field: 'ids.compId', items: Jod.id().data },
  { field: 'ids.subCompId', items: Jod.id().data },
  { field: 'payload', items: Jod.object().keys().required().data },
  { field: 'payload.level', items: Jod.number().integer().min(0).max(1000)
        .required().data },
  { field: 'payload.name', items: Jod.string().max(100).required().data },
  { field: 'payload.description', items: Jod.string().max(400).required().data },
  { field: 'payload.updatedBy', items: Jod.EID().data }
  ];


  name_is_jason_huang
  nameIsJasonHuang

name, age, FileContent, isReal, allTotal

name  ,  age,  FileContent ,isReal,allTotal
name, age, FileContent, isReal, allTotal
name, age, FileContent, isReal, allTotal

export class abc {


private _name: string | undefined = undefined;
public get name(): string | undefined {
  return this._name;
}
public set name(value: string | undefined) {
  this._name = value;
}

private _age: string | undefined = undefined;
public get age(): string | undefined {
  return this._age;
}
public set age(value: string | undefined) {
  this._age = value;
}

private _fileContent: string | undefined = undefined;
public get fileContent(): string | undefined {
  return this._fileContent;
}
public set fileContent(value: string | undefined) {
  this._fileContent = value;
}

private _isReal: boolean | undefined = undefined;
public get isReal(): boolean | undefined {
  return this._isReal;
}
public set isReal(value: boolean | undefined) {
  this._isReal = value;
}

private _allTotal: number | undefined = undefined;
public get allTotal(): number | undefined {
  return this._allTotal;
}
public set allTotal(value: number | undefined) {
  this._allTotal = value;
}
}
const content = `name
age
FileContent
isReal
allTotal`;
console.log(content.replace(/\r\n/g, ','))
const content = `

name
age
FileContent
isReal
allTotal`;
console.log(content.replace(/\n/g, ','))
