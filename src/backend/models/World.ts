import Dimension from "./Dimension";

export default class World {
    constructor(
        public name: string,
        public dimension: Dimension,
    ) {}

    generateWorld(){}
}
