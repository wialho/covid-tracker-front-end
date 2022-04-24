import Select, { StylesConfig } from 'react-select';

interface ColorSelectProps{
    onSelect: (x?: string) => void
    initialValue: string | undefined
}

export const colors = [
    { value: '#fc2847', label: 'Red'},
    { value: '#ffa343', label: 'Orange'},
    { value: '#fdfc74', label: 'Yellow'},
    { value: '#71bc78', label: 'Green'},
    { value: '#0f4c81', label: 'Blue'},
    { value: '#7442cb', label: 'Purple'},
    { value: '#fb7efd', label: 'Violet'},
]

const ColorSelect = (props: ColorSelectProps) => {

    const colorStyles = {
        control: (styles: any) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles: any, { data, isDisabled, isFocused, isSelected }: any) => {
          return {
            ...styles,
            backgroundColor: isDisabled
              ? undefined
              : isSelected
              ? data.value
              : isFocused
              ? data.value
              : undefined,
            ':active': {
              ...styles[':active'],
              backgroundColor: !isDisabled
                ? isSelected
                  ? data.value
                  : data.value
                : undefined,
            },
          };
        }
    }

    return (
        <Select options={colors}
            isClearable={false}
            isSearchable={false}
            onChange={(e) => props.onSelect(e?.value)}
            value={colors.find(x => x.value === props.initialValue)}
            styles={colorStyles}/>
    )
}

export default ColorSelect;