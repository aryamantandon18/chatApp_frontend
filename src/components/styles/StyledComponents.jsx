import {styled} from "@mui/material";

export const VisuallyHiddenInput = styled("input")({
    border:0,
    clip:"rect(0 0 0 0)",
    hieght:1,
    margin:-1,
    overflow:"hidden",
    padding:0,
    position:"absolute",
    whiteSpace:"nowrap",
    width:1,
});
