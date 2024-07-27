import { useRouter } from "next/navigation";

import {
  Command,
  CommandMenu,
  CommandWrapper,
  useCommands,
  useKmenu,
  setOpen
} from 'kmenu';

import { HiViewGridAdd, HiPlusCircle } from 'react-icons/hi'
import { TbSunMoon, TbSunFilled, TbMoonFilled } from 'react-icons/tb'

interface Props {
  children?: React.ReactNode;
  commands?: [key: string, value: any][]
}

/**
 * This component is a wrapper around kmenu, it simplifies adding command palette 
 * with basic commands and simplfies addition of extra commands for specific context.
 *
 * Props:
 * - children: ReactNode (optional) - Any child components to be rendered inside the CommandPalette. This is mainly to add sub menus.
 * - commands: Object (optional) - An object containing additional commands to be included in the palette.
 *   - The object can have keys: 'navigations', 'actions', and 'preferences', each mapping to an array of commands.
 *
 * Example (adding a new action):
 * ```jsx
 * import CommandPalette from './CommandPalette';
 * 
 * function MyComponent() {
 *   const additionalCommands = {
 *       actions: [
 *         {
 *           icon: <HiPlusCircle />,
 *           text: 'New Notebook',
 *           perform: () => openModal('new-notebook-modal'),
 *           closeOnComplete: true,
 *           keywords: ['new', 'create', 'add'],
 *         },
 *       ]
 *   };
 * 
 *   return (
 *     <>
 *       <CommandPalette commands={additionalCommands}>
 *       ...
 *     </>
 *   );
 * }
 * ```
 *
 * https://kmenu.hxrsh.in/docs/
 */

export default function CommandPalette({ children, commands = {} }: Props) {
  const { setOpen } = useKmenu()
  const router = useRouter()

  const navigations = [
    {
      icon: <HiViewGridAdd />,
      text: 'Notebook',
      perform: () => { router.push('/notebooks') },
      keywords: ['home', 'back'],
    },
  ]

  const actions = [
    // No default actions
  ]

  const preferences = [
    {
      icon: <TbSunMoon />,
      text: 'Change Theme...',
      perform: () => { setOpen(2) },
      keywords: ['light', 'dark', 'theme', 'color', 'mode'],
    },
  ]

  const mainCommands: Command[] = [
    {
      category: 'Navigation',
      commands: navigations.concat(commands['navigations'] || [])
    },
    {
      category: 'Actions',
      commands: actions.concat(commands['actions'] || [])
    },
    {
      category: 'Preferences',
      commands: preferences.concat(commands['preferences'] || [])
    },
  ];

  const themesCommands: Command[] = [
    {
      category: 'Themes',
      commands: [
        {
          icon: <TbSunFilled />,
          text: 'Light',
          perform: () => {
            document.body.classList.remove('dark');
            document.body.classList.add('light');
          },
          keywords: ['light', 'day'],
        },
        {
          icon: <TbMoonFilled />,
          text: 'Dark',
          perform: () => {
            document.body.classList.remove('light');
            document.body.classList.add('dark');
          },
          keywords: ['dark', 'night'],
        },
      ]
    }
  ];

  const [main] = useCommands(mainCommands)
  const [themes] = useCommands(themesCommands)

  return (
    <CommandWrapper>
      <CommandMenu commands={main} index={1} />
      <CommandMenu commands={themes} index={2} />

      {/* In case we want to add sub menus */}
      {children}
    </CommandWrapper>
  );
}