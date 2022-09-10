import { Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import Section, { SectionItem } from '../components/index/section';
import Title from '../components/index/title';

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
    description: '',
  },
  {
    icon: BsTwitter,
    link: 'https://twitter.com/_tymf',
    title: 'Twitter',
    description: '',
  },
];

const IndexPage: React.FC = () => {
  return (
    <main
      style={{
        margin: '2rem',
        fontFamily: 'Meiryo, Roboto, sans-serif, serif',
      }}>
      <title>nnsnico&apos;s home page</title>
      <Flex backgroundColor="whiteAlpha.200" direction="column" padding="16">
        <Title />
        <Section title="ブログ" items={blogSectionItems} />
        <Spacer marginBottom="8" />
        <Section title="つくったもの" items={workingSectionItems} />
        <Spacer marginBottom="8" />
        <Section title="About me" items={LinkSectionItems} />
      </Flex>
    </main>
  );
};

export default IndexPage;
