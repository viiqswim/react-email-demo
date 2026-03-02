import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

export interface WelcomeEmailProps {
  username: string;
  confirmUrl: string;
}

export const Welcome = ({
  username = 'there',
  confirmUrl = 'https://example.com/verify',
}: WelcomeEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our platform! Please verify your email address.</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#007bff',
              },
            },
          },
        }}
      >
        <Body className="bg-gray-100 font-sans">
          <Container className="mx-auto my-10 max-w-xl bg-white rounded-lg shadow-lg p-8">
            <Heading className="text-3xl font-bold text-center text-gray-800 mb-6">
              Welcome, {username}!
            </Heading>
            <Text className="text-gray-700 text-base leading-relaxed mb-4">
              Thank you for signing up! We're excited to have you on board.
            </Text>
            <Text className="text-gray-700 text-base leading-relaxed mb-6">
              To get started, please verify your email address by clicking the button below:
            </Text>
            <Container className="text-center mb-6">
              <Button
                href={confirmUrl}
                className="bg-brand text-white font-semibold py-3 px-6 rounded-lg inline-block text-base"
              >
                Verify Email
              </Button>
            </Container>
            <Text className="text-gray-500 text-sm text-center mt-8">
              If you didn't create an account, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Welcome;
