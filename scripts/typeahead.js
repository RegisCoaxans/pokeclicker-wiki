const { gotoPage } = require('./navigation');
const { getAvailablePokemon } = require('./pages/pokemon');

const excludedItemTypes = [
  'PokemonItem',
  'BerryItem',
  'BuyKeyItem',
  'BuyOakItem',
];

// Load gyms and handle duplicate leader names
const gymEntries = Object.entries(GymList).filter(([key, gym]) => GameConstants.getGymRegion(gym) <= GameConstants.MAX_AVAILABLE_REGION).map(([key, gym]) => ({
  display: gym.leaderName,
  type: 'Gyms',
  page: key,
}));

const duplicateGymDisplayNames = new Set(gymEntries.filter((entry, idx, list) => {
  return list.findLastIndex(innerEntry => innerEntry.display === entry.display) !== idx;
}).map(entry => entry.display));

if (duplicateGymDisplayNames.size) {
  for (let entry of gymEntries) {
    if (duplicateGymDisplayNames.has(entry.display)) {
      const gymInstance = GymList[entry.page];

      // Elite check mirrors AchievementHandler.initialize
      const elite = entry.page.includes('Elite') || entry.page.includes('Champion') || entry.page.includes('Supreme');

      const gymName = gymInstance.displayName ?? `${entry.page}${!elite ? ' Gym' : ''}`;

      entry.display = `${entry.display} (${gymName})`;
    }
  }
}

const searchOptions = [
  {
    display: 'Home',
    type: '',
    page: '',
  },
  {
    display: 'Wiki Guide',
    type: 'Wiki Guide',
    page: '',
  },
  {
    display: 'Battle Frontier',
    type: 'Battle Frontier',
    page: '',
  },
  // Pokémon
  {
    display: 'Pokémon',
    type: 'Pokémon',
    page: '',
  },
  ...Object.values(getAvailablePokemon()).map(p => ({
    display: `#${Math.floor(p.id).toString().padStart(3, '0')} - ${p.name}`,
    type: 'Pokémon',
    page: p.name,
  })),
  {
    display: 'Alternate Pokémon Forms',
    type: 'Alternate Pokémon Forms',
    page: '',
  },
  {
    display: 'Mega Pokémon',
    type: 'Mega Pokémon',
    page: '',
  },
  // Dungeons
  {
    display: 'Dungeons',
    type: 'Dungeons',
    page: '',
  },
  ...Object.values(dungeonList).filter(d => GameConstants.getDungeonRegion(d.name) <= GameConstants.MAX_AVAILABLE_REGION).map(d => ({
    display: d.name,
    type: 'Dungeons',
    page: d.name,
  })),
  // Gems
  {
    display: 'Gems',
    type: 'Gems',
    page: '',
  },
  ...GameHelper.enumStrings(PokemonType).filter(t => t != 'None').map(t => ({
    display: `${t} Gem`,
    type: 'Gems',
    page: t,
  })),
  ...GameHelper.enumStrings(PokemonType).filter(t => t != 'None').map(t => ({
    display: `${t} Catch Type Quests`,
    type: 'Catch Type Quests',
    page: t,
  })),
  // Berries
  {
    display: 'Berries',
    type: 'Berries',
    page: '',
  },
  ...App.game.farming.berryData.map(b => ({
    display: `${BerryType[b.type]} Berry`,
    type: 'Berries',
    page: BerryType[b.type],
  })),
  // Eggs
  {
    display: 'Eggs',
    type: 'Eggs',
    page: '',
  },
  // Items
  {
    display: 'Items',
    type: 'Items',
    page: '',
  },
  ...Object.values(ItemList).filter(i => !excludedItemTypes.includes(i.constructor.name)).map(i => ({
    display: i.displayName,
    type: 'Items',
    page: i.displayName,
  })),
  ...UndergroundItems.list.filter((ui) => !Object.values(ItemList).some((i) => i.displayName == ui.displayName)).map(i => ({
    display: i.displayName,
    type: 'Items',
    page: i.displayName,
  })),
  // QuestLines
  {
    display: 'Quest Lines',
    type: 'Quest Lines',
    page: '',
  },
  ...App.game.quests.questLines().map(q => ({
    display: q.name,
    type: 'Quest Lines',
    page: q.name,
  })),
  // Battle Cafe
  {
    display: 'Battle Café',
    type: 'Battle Cafe',
    page: '',
  },
  // Vitamins
  {
    display: 'Vitamins',
    type: 'Vitamins',
    page: '',
  },
  // Hatchery
  {
    display: 'Hatchery',
    type: 'Hatchery',
    page: '',
    redirects: ['Daycare'],
  },
  // Hatchery Helpers
  {
    display: 'Hatchery Helpers',
    type: 'Hatchery Helpers',
    page: '',
  },
  ...HatcheryHelpers.list.map(h => ({
    display: h.name,
    type: 'Hatchery Helpers',
    page: h.name,
  })),
  // Events
  {
    display: 'Events',
    type: 'Events',
    page: '',
  },
  ...App.game.specialEvents.events.map(e => ({
    display: e.title,
    type: 'Events',
    page: e.title,
  })),
  // Regions
  {
    display: 'Regions',
    type: 'Regions',
    page: '',
  },
  ...Object.entries(GameConstants.Region).filter(([region, regionName]) => region <= GameConstants.MAX_AVAILABLE_REGION && region >= 0).map(([region, regionName]) => regionName).map(r => ({
    display: GameConstants.camelCaseToString(r),
    type: 'Regions',
    page: GameConstants.camelCaseToString(r),
  })),
  // Towns
  {
    display: 'Towns',
    type: 'Towns',
    page: '',
  },
  ...Object.values(TownList).filter(t => !(t instanceof DungeonTown) && t.region <= GameConstants.MAX_AVAILABLE_REGION).map(t => ({
    display: t.name,
    type: 'Towns',
    page: t.name,
  })),
  // Safari
  {
    display: 'Safari',
    type: 'Safari',
    page: '',
  },
  // Gyms
  {
    display: 'Gyms',
    type: 'Gyms',
    page: '',
  },
  ...gymEntries,
  // Routes
  {
    display: 'Routes',
    type: 'Routes',
    page: '',
  },
  ...Routes.regionRoutes.filter(r => r.region <= GameConstants.MAX_AVAILABLE_REGION).map(r => ({
    display: r.routeName,
    type: 'Routes',
    page: r.routeName,
  })),
  // Farm
  {
    display: 'Farm',
    type: 'Farm',
    page: '',
    redirects: ['Mutating Berries', 'Mutation'],
  },
  {
    display: 'Farm Simulator',
    type: 'Farm Simulator',
    page: '',
  },
  {
    display: 'Setups (Farm)',
    type: 'Farm',
    page: 'Setups',
  },
  // Farm Hands
  {
    display: 'Farm Hands',
    type: 'Farm Hands',
    page: '',
  },
  ...FarmHands.list.map(fh => ({
    display: `${fh.name} (Farm Hands)`,
    type: 'Farm Hands',
    page: fh.name,
  })),
  // Pokérus
  {
    display: 'Pokérus',
    type: 'Pokérus',
    page: '',
    redirects: ['EVs', 'Effort Values', 'Infected', 'Contagious', 'Resistant'],
  },
  // Dream Orbs
  {
    display: 'Dream Orbs',
    type: 'Dream Orbs',
    page: '',
  },
  // Rare Hold Items
  {
    display: 'Rare Hold Items',
    type: 'Rare Hold Items',
    page: '',
  },
  // Daily Deals
  {
    display: 'Daily Deals',
    type: 'Daily Deals',
    page: '',
  },
  // Weather
  {
    display: 'Weather',
    type: 'Weather',
    page: '',
  },
  // Oak Itens
  {
    display: 'Oak Items',
    type: 'Oak Items',
    page: '',
  },
  ...App.game.oakItems.itemList.map(o => ({
    display: o.displayName,
    type: 'Oak Items',
    page: o.displayName,
  })),
  // Temporary Battles
  {
    display: 'Temporary Battles',
    type: 'Temporary Battles',
    page: '',
  },
  // Wandering Pokémon
  {
    display: 'Wandering Pokémon',
    type: 'Wandering Pokémon',
    page: '',
  },
  // Shiny Chance
  {
    display: 'Shiny Chance',
    type: 'Shiny Chance',
    page: '',
  },
  // Roaming Pokémon
  {
    display: 'Roaming Pokémon',
    type: 'Roaming Pokémon',
    page: '',
  },
  // Baby Pokémon
  {
    display: 'Baby Pokémon',
    type: 'Baby Pokémon',
    page: '',
  },
  // Key Items
  {
    display: 'Key Items',
    type: 'Key Items',
    page: '',
  },
  ...App.game.keyItems.itemList.map(k => ({
    display: k.displayName,
    type: 'Key Items',
    page: '',
  })),
  // Shadow Pokemon
  {
    display: 'Shadow Pokémon',
    type: 'Shadow Pokémon',
    page: '',
  },
  //Currency Pages
  {
    display: 'Pokédollars',
    type: 'Pokédollars',
    page: '',
  },
  {
    display: 'Dungeon Tokens',
    type: 'Dungeon Tokens',
    page: '',
  },
  {
    display: 'Quest Points',
    type: 'Quest Points',
    page: '',
  },
  {
    display: 'Farm Points',
    type: 'Farm Points',
    page: '',
  },
  {
    display: 'Diamonds',
    type: 'Diamonds',
    page: '',   
  },
  {
    display: 'Battle Points',
    type: 'Battle Points',
    page: '',
  },
  //Challenge Modes
  {
    display: 'Challenge Modes',
    type: 'Challenge Modes',
    page: '',
  },
  // Shops
  {
    display: 'Shops',
    type: 'Shops',
    page: '',
  },
  // Flutes
  {
    display: 'Flutes',
    type: 'Flutes',
    page: '',
  },
  // Achievements
  {
    display: 'Achievements',
    type: 'Achievements',
    page: '',
  },
  // Poké Balls
  {
    display: 'Poké Balls',
    type: 'Poké Balls',
    page: '',
  },
  {
    display: 'Pokéballs',
    type: 'Poké Balls',
    page: '',
  },
  // Dungeon Guides
  {
    display: 'Dungeon Guides',
    type: 'Dungeon Guides',
    page: '',
  },
  ...DungeonGuides.list.map(g => ({
    display: g.name,
    type: 'Dungeon Guides',
    page: g.name,
  })),
  // Click Attack
  {
    display: 'Click Attack',
    type: 'Click Attack',
    page: '',
  },
  // Environments
  {
    display: 'Environments',
    type: 'Environments',
    page: '',
  },
  ...Object.keys(GameConstants.Environments).map(env => ({
    display: `${GameConstants.camelCaseToString(env)} (Environment)`,
    type: 'Environments',
    page: `${GameConstants.camelCaseToString(env)}`,
  })),
  // Desktop Client
  {
    display: 'Desktop Client',
    type: 'Desktop Client',
    page: '',
  },
  // Underground
  {
    display: 'Underground',
    type: 'Underground',
    page: '',
    redirects: ['Mine', 'Mining'],
  },
  // Underground Helpers
  {
    display: 'Underground Helpers',
    type: 'Underground Helpers',
    page: '',
  },
  // Berry Masters
  {
    display: 'Berry Masters',
    type: 'Berry Masters',
    page: '',
  },
  // Game Updates
  {
    display: 'Game Updates',
    type: 'Game Updates',
    page: '',
  },
];
// Differentiate our different links with the same name
searchOptions.forEach(a => {
  const duplicates = searchOptions.filter(b => b.display == a.display);
  if (duplicates.length > 1) {
    duplicates.forEach(d => d.display = `${d.display} (${d.type})`);
  }
})
// Redirects
searchOptions.forEach(a => {
  a.redirects?.forEach(r => {
    searchOptions.push({ ...a, redirect: r });
  });
});

/*
    AUTO FILL FOR SEARCH BAR
*/

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&').replace(/[eé]/g, '[eé]');
}
// This is the function which figures out the results to show
var substringMatcher = (searchData) => {
  return (query, cb) => {
    // regex used to determine if a string contains the substring `q`
    const substrRegex = new RegExp(escapeRegExp(query), 'i');

    // iterate through the pool of strings and for any string that matches the regex
    const results = searchData.filter(d => substrRegex.test(d.redirect || d.display));

    cb(results.sort((a, b) => a.display.search(substrRegex) - b.display.search(substrRegex) || a.display.length - b.display.length));
  };
};

// Initiate out autofill/typeahead
$('#search').typeahead({
  hint: true,
  highlight: true,
  minLength: 1,
  classNames: {
    menu: 'dropdown-menu',
    suggestion: 'dropdown-item',
    cursor: 'active',
    highlight: 'text-primary'
  },
},
{
  name: 'Search',
  limit: 8,
  source: substringMatcher(searchOptions),
  display: 'display',
  templates: {
    notFound: '<a class="dropdown-item disabled">No results found...</a>',
    suggestion: (suggestion) => {
      const display = suggestion.redirect ? `${suggestion.redirect} → ${suggestion.display}` : suggestion.display;
      return `<a href="#!${suggestion.type}/${suggestion.page}">${display}</a>`;
    },
  },
});
$('#search').bind('typeahead:select', (ev, suggestion) => {
  gotoPage(suggestion.type, suggestion.page);
});
$('#search').bind('typeahead:autocomplete', (ev, suggestion) => {
  gotoPage(suggestion.type, suggestion.page);
});

module.exports = { 
  searchOptions,
};
