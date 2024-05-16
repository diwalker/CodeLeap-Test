import React from "react";
import styled from "styled-components";
import Icon from "react-crud-icons";
import "react-crud-icons/dist/css/react-crud-icons.css";  

const IconContainer = styled.div`
    gap: 10px;
    cursor: pointer;
`;

const Icons = ({ post, setEditPost, setDeletePostId }) => (
    <IconContainer>
        <Icon
            name="edit"
            tooltip="Edit"
            size="small"  
            theme="black"
            onClick={() => setEditPost(post)}
        />
        <Icon
            name="delete"
            tooltip="Delete"
            size="small"
            theme="black"
            onClick={() => setDeletePostId(post.id)}
        />
    </IconContainer>
);

export default Icons;
