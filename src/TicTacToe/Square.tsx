import * as React from "react";

declare interface IProps {
    value: number;
}

declare interface IState {
    value: string | null;
}

class Square extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            value: null,
        };

        this.setValue = this.setValue.bind(this);

    }

    public render() {
        return (
            <button className="square" onClick={this.setValue}>
                {this.state.value}
            </button>
        );
    }

    private setValue() {
        this.setState({value: 'X'})
    }
}

export default Square;
