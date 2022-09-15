import { useSelector } from "react-redux";
import { selectLastAction } from "../redux/actionsSlice";

export const LastAction = () => {
    const lastAction = useSelector(selectLastAction);

    if (!lastAction) return null;
    return <div>{lastAction}</div>;
};
