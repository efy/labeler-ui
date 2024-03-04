import { TextAnnotation } from '@/common/types';
import { TextAnnotator } from 'react-text-annotate';
import { useState } from 'react';
import { Box, Button, Group, Space, useMantineTheme } from '@mantine/core';

type LabelConfig = {
  label: string,
  color: string,
}

type CompoBoxProps = {
  text: string
  labels: LabelConfig[],
  annotations: TextAnnotation[],
  onUpdate?: (annotations: TextAnnotation[]) => void
}

export function EntityLabeler({
  text,
  labels,
  annotations,
  onUpdate
}: CompoBoxProps) {
  const initialLabel = labels[0]?.label || ""

  const [value, setValue] = useState<TextAnnotation[]>(annotations||[]);
  const [tag, setTag] = useState(initialLabel);
  const theme = useMantineTheme();

  // Lookup theme to get lighter variants for highlighting spans
  const highlightColors = labels.reduce<Record<string, string>>((acc, el) => {
    acc[el.label] = theme.colors[el.color][2]
    return acc
  }, {});

  const handleChange = (value: any) => {
    setValue(value)

    if(onUpdate) {
      onUpdate(value)
    }
  }

  return (
    <>
      <TextAnnotator
        content={text}
        value={value}
        onChange={handleChange}
        getSpan={span => ({
          ...span,
          tag: tag,
          color: highlightColors[tag]
        })}
      />
      <Space h="md" />
      <Group gap="xs">
        {labels?.map((el, idx) => (
          <Button 
            key={idx}
            size='xs'
            variant={tag === el.label ? "filled" : "outline" } 
            color={el.color || "gray"}
            onClick={() => setTag(el.label)}
          >
            {idx + 1} - {el.label}
          </Button>
        ))}
      </Group>
    </>
  );
}
