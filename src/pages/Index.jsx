import React, { useState } from "react";
import { Container, VStack, FormControl, FormLabel, Input, Button, Heading, useToast, Box, Text } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Index = () => {
  const toast = useToast();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-c2hy.fly.dev/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        // You would typically do something with the accessToken here, like storing it in state or sending it to a context/store
        toast({
          title: "Login successful!",
          description: "You are now logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed.",
          description: "Please check your credentials and try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://backengine-c2hy.fly.dev/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.status === 204) {
        toast({
          title: "Signup successful!",
          description: "You can now log in with your credentials.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsSigningUp(false);
      } else {
        toast({
          title: "Signup failed.",
          description: "Please try again with different credentials.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={8} mt={16}>
        <Heading>{isSigningUp ? "Signup" : "Login"}</Heading>
        <Box as="form" width="full" onSubmit={isSigningUp ? handleSignup : handleLogin}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button leftIcon={isSigningUp ? <FaUserPlus /> : <FaSignInAlt />} type="submit" colorScheme="blue" width="full">
              {isSigningUp ? "Signup" : "Login"}
            </Button>
          </VStack>
        </Box>
        <Text cursor="pointer" color="blue.500" onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
        </Text>
      </VStack>
    </Container>
  );
};

export default Index;
