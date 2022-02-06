import React from "react";

/**
 * getting all the non ref props with checking
 */
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithoutRef<C>>;

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C;
};
/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = {},
  OverrideProps = {}
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>;

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
  C extends React.ElementType,
  Props = {}
> = ExtendableProps<PropsOf<C>, Props>;

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = InheritableElementProps<C, Props & AsProp<C>>;

interface Props {
  children: React.ReactNode;
  color?: string;
  font?: "thin" | "regular" | "heavy";
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";
}

type TextProps<C extends React.ElementType> = PolymorphicComponentProps<
  C,
  Props
>;

export const Text = <C extends React.ElementType = "span">({
  as,
  children,
  font = "regular",
  size = "4",
  color = "gray-40",

  ...other
}: TextProps<C>) => {
  console.log(as);
  const classes = "";
  const Component = as || "span";

  return (
    <Component {...other} className={classes}>
      {children}
    </Component>
  );
};
