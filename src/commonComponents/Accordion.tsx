import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { AccordionProps } from '../types';

const Accordion = ({ title, children, expanded = true }: AccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div className="mb-1">
      <div
        className="w-full py-2 px-3 flex items-center justify-between bg-gray-700"
        role="button"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <FontAwesomeIcon
          className="ml-2"
          icon={isExpanded ? faChevronUp : faChevronDown}
        />
      </div>
      <div
        className={`transition-all duration-200 ease-in-out ${
          isExpanded ? 'max-h-40' : 'max-h-0'
        }
        overflow-hidden`}
      >
        <div className="px-2 my-2">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
