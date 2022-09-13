import { Flex, HStack, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import Section, { SectionItem } from '../components/parts/section';
import Title from '../components/atoms/title'
import Container from '../components/layouts/container';
import Header from '../components/parts/header';

const blogSectionItems: SectionItem[] = [
  {
    link: '/blog',
    title: 'To be Added',
    description: '気が向いたら実装する',
  },
];

const workingSectionItems: SectionItem[] = [
  {
    link: '/works/airkey',
    title: 'Airkey',
    description: 'キーボードのレイアウトをDnDで確認できるやつ(未完)',
  },
];

const LinkSectionItems: SectionItem[] = [
  {
    icon: BsGithub,
    link: 'https://github.com/nnsnico',
    title: 'GitHub',
  },
  {
    icon: BsTwitter,
    link: 'https://twitter.com/_tymf',
    title: 'Twitter',
  },
];

const IndexPage: React.FC = () => {
  return (
    <main
      style={{
        fontFamily: 'Meiryo, Roboto, sans-serif, serif',
      }}>
      <title>nnsnico&apos;s website</title>
      <Header>
        <HStack>
          <Text textColor="gray.700" >(´ワ｀ )</Text>
          <Title>nnsnico&apos;s website</Title>
        </HStack>
      </Header>
      <Container>
        <Section title="ブログ" items={blogSectionItems} />
        <Spacer marginBottom="8" />
        <Section title="つくったもの" items={workingSectionItems} />
        <Spacer marginBottom="8" />
        <Section title="About me" items={LinkSectionItems} />
      </Container>
    </main>
  );
};

export default IndexPage;
