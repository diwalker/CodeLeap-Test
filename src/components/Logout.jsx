import React from "react";
import styled from "styled-components";
import Icon from "react-crud-icons";
import "react-crud-icons/dist/css/react-crud-icons.css";  

const LogoutContainer = styled.div`
    cursor: pointer;
`;

const Logout = () => (
    <LogoutContainer>
            <Icon
                name="export"
                tooltip="Logout"
                size="medium"  
                theme="black"
                onClick={() => {
                    window.location.href = "/signup";
                }}
            />
        </LogoutContainer>
);

export default Logout;
