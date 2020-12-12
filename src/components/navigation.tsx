import React from "react";
import {Button, Flex} from "@chakra-ui/react"
import Logo from "./logo";

const Navigation: React.FC = () => {
    return <Flex
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.0rem"
        bg="white"
        boxShadow="xl">
        <Logo />
        <Button backgroundColor="#4FC3F7" color="white" size="sm">使い方</Button>
    </Flex>;
};

export default Navigation;