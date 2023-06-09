import {
    IconNotification,
    IconCode,
    IconBook,
    IconChartPie3,
    IconFingerprint,
    IconCoin
  } from '@tabler/icons-react';
import { Routes } from './routes';

export const topMenu = [
    {
      icon: IconCode,
      title: 'Utilisateurs',
      description: 'This Pokémon’s cry is very loud and distracting',
      href: Routes.users
    },
    {
      icon: IconCoin,
      title: 'Roles & Permissions',
      description: 'The fluid of Smeargle’s tail secretions changes',
      href: Routes.roles
    },
    {
      icon: IconBook,
      title: 'Villes',
      description: 'Yanma is capable of seeing 360 degrees without',
      href: Routes.cities
    },
    {
      icon: IconFingerprint,
      title: 'Devises',
      description: 'The shell’s rounded shape and the grooves on its.',
      href: Routes.currencies
    },
    {
      icon: IconChartPie3,
      title: 'Taux de change',
      description: 'This Pokémon uses its flying ability to quickly chase',
      href: Routes.rates
    },
    {
      icon: IconNotification,
      title: 'Modes de paiement',
      description: 'Combusken battles with the intensely hot flames it spews',
      href: Routes.payModes
    },
];

export const sideMenu = [
    {
      icon: IconCode,
      title: 'Dashboard',
      description: 'This Pokémon’s cry is very loud and distracting',
      href: Routes.home
    },
   
];