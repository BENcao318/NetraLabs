import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import React from 'react'
import options from '../data/options.json'

export const SearchBar = ({ selectedTags, setSelectedTags }) => {
  const animatedComponents = makeAnimated()

  const handleTagChange = (selectedOption) => {
    setSelectedTags(selectedOption)
  }

  return (
    <div>
      <Select
        isMulti
        options={options}
        onChange={handleTagChange}
        components={animatedComponents}
        value={selectedTags}
        placeholder="Type keywords for Languages, frameworks, databases, etc."
      />
    </div>
  )
}
