using System;
using System.Collections.Generic;
using System.Text;

namespace LRParser
{
    public class LR1Item : LRItem
    {
        public bool hasHandle()
        {

        }

        public Symbol getProductionHead()
        {

        }

        public Symbol getLookahead()
        {

        }
    }

    public interface ILALRParser
    {
        public LR1Item[] closure();
        LR1Item[] GOTO();
        LR1Item[] FIRST();
        LR1Item[] FOLLOW();

    }

    public class LALRParser : ILALRParser
    {
        public Grammar grammar;
        public Grammar extendedGrammar;

        public List<LR1Item> closure(List<LR1Item> items)
        {
            foreach (LR1Item item in items)
            {
                foreach (Production production in this.grammar.productions)
                {
                    foreach (Symbol terminal in FIRST(symbols))
                    {
                        items.Add(new LR0Item(production));
                    }
                }
            }
            return items;
        }

        public LR1Item[] GOTO(List<LR1Item> items, GrammarSymbol symbol)
        {
            List<LR1Item> processedItems = new List<LR1Item>();
            foreach (LR1Item item in items)
            {
                processedItems.Add(item.updatePosition());
            }
            return closure(processedItems);

        }

        void items(Grammar extendedGrammar)
        {
            Dictionary<int, List<LR0Item>> canonicalCollection = new Dictionary<int, List<LR0Item>>();
            foreach (LR1Item item in closureItems)
            {
                foreach (GrammarSymbol symbol in grammar.symbols)
                {
                    LR1Item toBeAdded = GOTO(item, symbol);
                    if (!String.Empty(toBeAdded) && !closureItems.Contains(toBeAdded))
                    {
                        closureItems.Add(toBeAdded);
                    }
                }
            }
        }

        public LR1Item[] FIRST()
        {

        }

        public LR1Item[] FOLLOW()
        {

        }

        public void setParsingTable(Grammar extendedGrammar)
        {
            Dictionary<int, List<LR1Item>> canonicalCollection = this.items(extendedGrammar);
            foreach (var itemsList in canonicalCollection)
            {
                foreach (LR1Item item in itemsList.Value)
                {
                    if (item.hasTerminalAfterPosition() && this.hasGoToState())
                    {
                        Symbol itemSymbol = item.getTerminalAfterPosition(this.grammar.terminals.ToArray());
                        int goToState = item.getGoToState();
                        this.parseTable.parseActions.Add(new ActionInput(itemsList.Key, itemSymbol), new ActionResult(goToState, Action.Shift));
                    }
                    else if (item.hasHandle() && item.getProductionHead() !== this.extendedGrammar.getStartSymbol())
                    {
                        Symbol itemSymbol = item.getLookahead();
                        this.parseTable.parseActions.Add(new ActionInput(itemsList.Key, itemSymbol), new ActionResult(item.reduceProduction(this.states), Action.Reduce));
                    }
                    else if (item.isFirstItemInExtendedGrammar())
                    {
                        Symbol itemSymbol = Symbol.getEndMarker();
                        this.parseTable.parseActions.Add(new ActionInput(itemsList.Key, itemSymbol), new ActionResult(Action.Accept));
                    }
                }
            }

        }


    }
}
