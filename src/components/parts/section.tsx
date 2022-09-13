import { List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';
import { IconType } from 'react-icons';
import SubTitle from '../atoms/subTitle';

export interface SectionItem {
  icon?: IconType;
  link: string;
  title: string;
  description?: string;
}

interface SectionProps {
  title: string;
  items: SectionItem[];
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, items, children }) => (
  <div>
    <SubTitle>{title}</SubTitle>
    <List>
      {children != null
        ? children
        : items.map((item, i) => (
          <ListItem key={i}>
            {
              item.icon != undefined
                ? <ListIcon verticalAlign="middle" as={item.icon} />
                : null
            }
            <Text
              as="span"
              textColor="blue.300"
              fontWeight="bold"
              fontSize="16">
              <Link to={item.link}>{item.title}</Link>
            </Text>
            <Text textColor="gray.800" fontSize="sm" lineHeight="5">
              {item.description}
            </Text>
          </ListItem>
        ))}
    </List>
  </div>
);

export default Section;
