import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { createRoot, Root } from 'react-dom/client';
import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Code2, MousePointer2, Sparkles } from 'lucide-react';

function InteractiveCodeCard(): React.ReactElement {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 20 });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
    const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * -14;
    x.set(normalizedX);
    y.set(normalizedY);
  };

  const reset = (): void => {
    x.set(0);
    y.set(0);
  };

  return React.createElement(
    'div',
    { className: 'react-stage', onPointerMove: handlePointerMove, onPointerLeave: reset },
    React.createElement(
      motion.div,
      {
        className: 'react-card',
        style: { rotateX, rotateY },
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: 'easeOut' }
      },
      React.createElement('div', { className: 'react-card-top' },
        React.createElement('span', null, React.createElement(Code2, { size: 16 }), ' heitor.dev'),
        React.createElement('span', { className: 'live-badge' }, 'LIVE')
      ),
      React.createElement('div', { className: 'react-code' },
        React.createElement('p', null, React.createElement('i', null, 'const'), ' developer = {'),
        React.createElement('p', { className: 'indent' }, 'name: ', React.createElement('b', null, "'Heitor'"), ','),
        React.createElement('p', { className: 'indent' }, 'focus: ', React.createElement('b', null, "'Full Stack'"), ','),
        React.createElement('p', { className: 'indent' }, 'stack: ', React.createElement('b', null, "['Angular', 'React']"), ','),
        React.createElement('p', null, '};')
      ),
      React.createElement(motion.div, { className: 'floating-badge badge-one', animate: { y: [0, -10, 0] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } }, React.createElement(Sparkles, { size: 14 }), ' Clean UI'),
      React.createElement(motion.div, { className: 'floating-badge badge-two', animate: { y: [0, 8, 0] }, transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }, React.createElement(MousePointer2, { size: 14 }), ' Interactive')
    )
  );
}

@Component({
  selector: 'app-react-widget',
  standalone: true,
  template: '<div #host class="react-host"></div>'
})
export class ReactWidgetComponent implements AfterViewInit, OnDestroy {
  @ViewChild('host', { static: true }) host!: ElementRef<HTMLDivElement>;
  private root?: Root;

  ngAfterViewInit(): void {
    this.root = createRoot(this.host.nativeElement);
    this.root.render(React.createElement(InteractiveCodeCard));
  }

  ngOnDestroy(): void {
    this.root?.unmount();
  }
}
