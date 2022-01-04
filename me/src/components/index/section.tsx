import { As, Heading, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { Link } from 'gatsby';
import React from 'react';

export interface SectionItem {
  icon?: As<unknown>;
  link: string;
  title: string;
  description: string;
}

interface SectionProps {
  title: string;
  items: SectionItem[];
}

const Section: React.FC<SectionProps> = ({ title, items, children }) => (
  <div>
    <Heading size="md" textColor="gray.700" marginBottom="2">
      {title}
    </Heading>
    <List>
      {children != null
        ? children
        : items.map((item, i) => (
            <ListItem key={i}>
              {item.icon != undefined ? <ListIcon as={item.icon} /> : null}
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
