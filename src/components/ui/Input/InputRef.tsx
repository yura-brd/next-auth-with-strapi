import React, { InputHTMLAttributes, forwardRef } from 'react';
import { FieldError} from 'react-hook-form';
import cn from 'classnames';



export interface IPropsInput extends InputHTMLAttributes<HTMLInputElement>  {
  className?: string;
  classWrap?: string;
  errors:  FieldError | undefined;
  currentValue?: string;
  placeholder?: string;
  multiply?: boolean;
  isRequired?: boolean;
}
export const InputRef = forwardRef<HTMLInputElement, IPropsInput>((props, ref) => {
  const {
    classWrap,
    className,
    errors,
    currentValue,
    multiply= false,
    isRequired= false,
    placeholder,
    type,
    ...otherProps
  } = props;


  const getField = () => {
    if (!multiply) {
      return <input
        placeholder={`${placeholder}${isRequired ? '*' : '' }`}
        ref={ref}
        type={type ? type : 'text'}
        {...otherProps}
        className={cn(className, 'px-2 py-1 bg-transparent border')} />
    }

    return  <textarea
      // @ts-ignore
      ref={ref}
      placeholder={`${placeholder}${isRequired ? '*' : '' }`}
      {...otherProps}
      className={ cn( 'px-2 py-1 bg-transparent border', className) } />
  }

  return <div className={`${classWrap} `}>
    { placeholder && <div className={cn('', {
      'this--show': currentValue
    })}>{placeholder}{isRequired ? <sup>*</sup> : ''}</div> }

    { getField() }

    {errors?.message && <div className={''}>{errors.message}</div>}
  </div>;
});
InputRef.displayName = 'InputRef';