import { useContext } from "react";
import { ContextApi } from "../contexts/ContextProvider";

const useContexts = () => {
    return useContext(ContextApi);
};

export default useContexts;
