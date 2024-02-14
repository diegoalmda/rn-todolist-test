// React/React Native imports
import React from 'react';
import { ActivityIndicator } from 'react-native';

// External libs imports
import { useTheme } from 'styled-components';
import { type RectButtonProps } from 'react-native-gesture-handler';

// Styles imports
import { Container, Title } from './styles';

interface Props extends RectButtonProps {
  title: string;
  color?: string;
  loading?: boolean;
  removeType?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  loading = false,
  removeType = false,
}: Props): React.JSX.Element {
  const theme = useTheme();

  return (
    <Container
      activeOpacity={0.7}
      color={color ?? theme.colors.shape_dark}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: !enabled || loading ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.background_details} />
      ) : (
        <Title removeType={removeType}>{title}</Title>
      )}
    </Container>
  );
}
