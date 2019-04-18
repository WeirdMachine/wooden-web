import * as React from "react";

declare interface IProps {
    value: string | null;
    onClick: () => void;
}

export default function Square(props: IProps) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );

}