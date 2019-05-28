import * as vscode from 'vscode';
import { NodeType } from '../NodeType';
import { BaseNode } from '../../BaseNode';
import { GenNode } from '../GenNode';

export class FrameConfigNode extends GenNode {
  constructor(
    public readonly label: string,
    tip: string,
    protected parent?: BaseNode
  ) {
    super(label, tip, vscode.TreeItemCollapsibleState.Expanded, NodeType.FrameCodeConfiguration, parent);
  }

  get isActive(): boolean {
    return true;
  }

  private _projectName: string = '';
  public get projectName(): string {
    return this._projectName;
  }
  public set projectName(value: string) {
    this._projectName = value;
  }

  private _language: string = '';
  public get language(): string {
    return this._language;
  }
  public set language(value: string) {
    this._language = value;
  }

  private _database: string = '';
  public get database(): string {
    return this._database;
  }
  public set database(value: string) {
    this._database = value;
  }

  private _needMockApi: boolean = false;
  public get needMockApi(): boolean {
    return this._needMockApi;
  }
  public set needMockApi(value: boolean) {
    this._needMockApi = value;
  }

  private _needPaginationLib: boolean = false;
  public get needPagination(): boolean {
    return this._needPaginationLib;
  }
  public set needPagination(value: boolean) {
    this._needPaginationLib = value;
  }
  private _needEmail: boolean = false;
  public get needEmail(): boolean {
    return this._needEmail;
  }
  public set needEmail(value: boolean) {
    this._needEmail = value;
  }
  private _needXlsx: boolean = false;
  public get needXlsx(): boolean {
    return this._needXlsx;
  }
  public set needXlsx(value: boolean) {
    this._needXlsx = value;
  }
  private _needFile: boolean = false;
  public get needFile(): boolean {
    return this._needFile;
  }
  public set needFile(value: boolean) {
    this._needFile = value;
  }
  private _needHttps: boolean = false;
  public get needHttps(): boolean {
    return this._needHttps;
  }
  public set needHttps(value: boolean) {
    this._needHttps = value;
  }
  private _needElasticSearch: boolean = false;
  public get needElasticSearch(): boolean {
    return this._needElasticSearch;
  }
  public set needElasticSearch(value: boolean) {
    this._needElasticSearch = value;
  }
  private _needKafka: boolean = false;
  public get needKafka(): boolean {
    return this._needKafka;
  }
  public set needKafka(value: boolean) {
    this._needKafka = value;
  }
  private _needTwilio: boolean = false;
  public get needTwilio(): boolean {
    return this._needTwilio;
  }
  public set needTwilio(value: boolean) {
    this._needTwilio = value;
  }
  private _needAws: boolean = false;
  public get needAws(): boolean {
    return this._needAws;
  }
  public set needAws(value: boolean) {
    this._needAws = value;
  }
  private _needPasswordSalt: boolean = false;
  public get needPasswordSalt(): boolean {
    return this._needPasswordSalt;
  }
  public set needPasswordSalt(value: boolean) {
    this._needPasswordSalt = value;
  }
  private _needPassword: boolean = false;
  public get needPassword(): boolean {
    return this._needPassword;
  }
  public set needPassword(value: boolean) {
    this._needPassword = value;
  }
  private _needMachineToken: boolean = false;
  public get needMachineToken(): boolean {
    return this._needMachineToken;
  }
  public set needMachineToken(value: boolean) {
    this._needMachineToken = value;
  }
  private _needTcJwt: boolean = false;
  public get needTcJwt(): boolean {
    return this._needTcJwt;
  }
  public set needTcJwt(value: boolean) {
    this._needTcJwt = value;
  }
  private _needJwt: boolean = false;
  public get needJwt(): boolean {
    return this._needJwt;
  }
  public set needJwt(value: boolean) {
    this._needJwt = value;
  }
  private _needKoa: boolean = false;
  public get needKoa(): boolean {
    return this._needKoa;
  }
  public set needKoa(value: boolean) {
    this._needKoa = value;
  }
  private _needSwgdoc: boolean = false;
  public get needSwgdoc(): boolean {
    return this._needSwgdoc;
  }
  public set needSwgdoc(value: boolean) {
    this._needSwgdoc = value;
  }
  private _needHeroku: boolean = false;
  public get needHeroku(): boolean {
    return this._needHeroku;
  }
  public set needHeroku(value: boolean) {
    this._needHeroku = value;
  }
  private _needTslint: boolean = false;
  public get needTslint(): boolean {
    return this._needTslint;
  }
  public set needTslint(value: boolean) {
    this._needTslint = value;
  }
  private _needEslint: boolean = false;
  public get needEslint(): boolean {
    return this._needEslint;
  }
  public set needEslint(value: boolean) {
    this._needEslint = value;
  }
  private _needCoverage: boolean = false;
  public get needCoverage(): boolean {
    return this._needCoverage;
  }
  public set needCoverage(value: boolean) {
    this._needCoverage = value;
  }
  private _needTest: boolean = false;
  public get needTest(): boolean {
    return this._needTest;
  }
  public set needTest(value: boolean) {
    this._needTest = value;
  }

}
