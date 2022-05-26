import { useParams } from "react-router-dom";

export const withRouter = WrappedComponent => props => {
    const params = useParams();
    // etc... other react-router-dom v6 hooks

    return (
        <WrappedComponent
            {...props}
            params={params} // disini kita define namanya adalah "params"
        // etc...
        />
    );
};