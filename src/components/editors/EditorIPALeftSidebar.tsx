import React from 'react';
import { IPACategory } from '../../lib/supabase/models/IPA';
import styles from './EditorIPALeftSidebar.module.scss';

interface ItemProps {
  category?: IPACategory;
  isSelected: boolean;
  onSelectCategory: (c: number) => void;
}

const SidebarItem = ({ category, onSelectCategory, isSelected }: ItemProps) => {
  const className = `${styles.item} ${
    isSelected ? styles['item--selected'] : ''
  }`;

  return (
    <button className={className} onClick={() => onSelectCategory(category.id)}>
      <h2 className={styles['item-text']}>{category.label}</h2>
    </button>
  );
};

interface Props {
  categories?: IPACategory[];
  selectedCategory: number;
  onSelectCategory: (c: number) => void;
}

const EditorIPALeftSidebar = ({
  selectedCategory,
  categories,
  onSelectCategory,
}: Props) => {
  if (categories)
    return (
      <div>
        {categories.map((category) => (
          <SidebarItem
            onSelectCategory={onSelectCategory}
            category={category}
            isSelected={
              selectedCategory ? category.id === selectedCategory : false
            }
          />
        ))}
      </div>
    );
  else return <></>;
};

export default EditorIPALeftSidebar;
