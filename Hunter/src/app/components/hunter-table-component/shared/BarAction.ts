import { TextMessage } from './../../../beans/text-message';
import { BActionDisplayEnum } from './BActionDisplayEnum';
import { ActionTypeEnum } from './ActionTypeEnum';

export default class BarAction {

    private _name: string;
    private _type: ActionTypeEnum
    private _displayType: BActionDisplayEnum
    private _text: string;
    private _bootstrapIconName: string;
    private _bootsButtonClass: string;

    public get name(): string {
        return this._name;
    }

    public set name( name: string ) {
        this._name = name;
    }

    public get type(): ActionTypeEnum {
        return this._type;
    }

    public set type( type: ActionTypeEnum ) {
        this._type = type;
    }

    public get displayType(): BActionDisplayEnum {
        return this._displayType;
    }

    public set displayType( displayType: BActionDisplayEnum ) {
        this._displayType = displayType;
    }

    public get text(): string {
        return this._text;
    }

    public set text( text: string ) {
        this._text = text;
    }

    public get bootstrapIconName(): string {
        return this._bootstrapIconName;
    }

    public set bootstrapIconName( bootstrapIconName: string ) {
        this._bootstrapIconName = bootstrapIconName;
    }

    public get bootsButtonClass(): string {
        return this._bootsButtonClass;
    }

    public set bootsButtonClass( bootsButtonClass: string ) {
        this._bootsButtonClass = bootsButtonClass;
    }

    public static create(
        name: string,
        type: ActionTypeEnum,
        displayType: BActionDisplayEnum,
        text: string,
        bootstrapIconName: string,
        bootsButtonClass: string
    ): BarAction {
        const action: BarAction = new BarAction();
        action.name = name;
        action.type = type;
        action.displayType = displayType;
        action.text = text;
        action.bootstrapIconName = bootstrapIconName;
        action.bootsButtonClass = bootsButtonClass;
        return action;
    }

}
