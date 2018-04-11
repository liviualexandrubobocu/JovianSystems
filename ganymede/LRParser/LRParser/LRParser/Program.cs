using System;
using System.Collections;
using System.Collections.Generic;


public class Production
{
    public string lhs;
    public string rhs;

    public Production(string lhs, string rhs)
    {
        this.lhs = lhs;
        this.rhs = rhs;
    }
}

public abstract class LRItem
{
    public int productionId;
    public int position;
    public Production production;

    public abstract bool hasTerminalAfterPosition(Symbol[] terminals);

    public abstract bool hasHandle(Symbol[] nonTerminals);
}

// An LR0Item is a production with a dot at some position of the body
public class LR0Item : LRItem
{
    public override bool hasTerminalAfterPosition(Symbol[] terminals)
    {
        foreach (Symbol terminal in terminals) {
            foreach(char productionSymbol in this.production.rhs)
            {
                if (terminal.s == productionSymbol.ToString()){ return true; }
            }
        }

        return false;
    }

    // This method is used to check for a handle in the production body
    public override bool hasHandle(Symbol[] nonTerminals)
    {
        foreach(Symbol nonTerminal in nonTerminals)
        {
            if(this.production.rhs.Substring(this.position, (this.production.lhs.Length - this.position)) == nonTerminal.s) return true;
        }
        return false;
    }

    public int getGoToState()
    {

    }

    // This method is used to get the terminal (if it exists) after the dot position.
    public Symbol getTerminalAfterPosition(Symbol[] terminals)
    {
        foreach (Symbol terminal in terminals)
        {
            foreach (char productionSymbol in this.production.rhs)
            {
                if (terminal.s == productionSymbol.ToString()) return terminal;
            }
        }
        return null;
    }

    // This method is used to check if the item's production coincides with the first production of the extended grammar.
    public bool isFirstItemInExtendedGrammar(Symbol[] nonTerminals)
    {
        if (this.production.lhs == nonTerminals[0].s) return true;
        return false;
    }

    public int reduceProduction(Dictionary<int, Symbol> states)
    {

    }
}

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

public enum Association
{
    Left,
    Right,
    None
}

public enum GrammarType
{
    Regular,
    ContextFree,
    ContextSensitive,
    RecursivelyEnumerable
}

public class Symbol {
    public string s;
    bool isFirst = false;

    public Symbol(string s)
    {
        this.s = s;
    }

    public static Symbol getEndMarker()
    {
        return new Symbol("$");
    }

    public static Symbol getEmptyWord()
    {
        return new Symbol("£");
    }
} 

public interface IGrammar
{
    public void derive();
    private void isOfType();
}

public class Grammar: IGrammar
{
    public List<Symbol> nonTerminals;
    public List<Symbol> terminals;
    public List<Production> productions;
    public List<PrecedenceRule> precedenceRules;

    public Symbol startSymbol;

    private GrammarType type;

    public void derive()
    {

    }

    public void setTerminals(string[] terminals)
    {

    }

    public void setNonTerminals(string[] terminals)
    {

    }

    public bool hasTerminal(Symbol symbol)
    {
        foreach(Symbol terminal in this.terminals)
        {
            if (symbol == terminal) return true;
        }
        return false;
    }

    public bool hasNonTerminal(Symbol symbol)
    {
        foreach (Symbol nonTerminal in this.nonTerminals)
        {
            if (symbol == nonTerminal) return true;
        }
        return false;
    }

    public bool hasProduction(string lhs, string rhs)
    {
        foreach(Production production in this.productions)
        {
            if(production.lhs == lhs && production.rhs == rhs)
            {
                return true;
            }
        }
        return false;
    }

    private bool isOfType(GrammarType type)
    {
        return true;
    }


    public List<Symbol> getAllSymbols()
    {
        var union = this.nonTerminals;
        union.AddRange(this.terminals);

        return union;
    }


    // Do first for to find a terminal;
    // If terminal hasn't been found return;
    // Do second for to find if all other non terminals before terminal
    // if all non terminals have productions in which they derive to empty word
    // return found terminal
    // otherwise return null
    public Symbol getTerminalAfterNonTerminals(Production production)
    {
        foreach(char character in production.rhs)
        {
            Symbol symbol = new Symbol(character.ToString());
            
        }
    }


}

public class PrecedenceRule
{
    Association association;
    List<Symbol> symbols;

    public PrecedenceRule(Association association, string[] symbols)
    {
        this.association = association;
        foreach(string symbol in symbols)
        {
            this.symbols.Add(new Symbol(symbol));
        }
    }
}

public class ActionInput {
    int state;
    Symbol symbol;
    Action actionType;
    public ActionInput(int state, Symbol symbol)
    {
        this.state = state;
        this.symbol = symbol;
    }
}


public enum Action
{
    Shift,
    Reduce,
    Accept,
    Error
}

public class ActionResult {
    int state;
    Action action;

    public ActionResult(int state, Action action)
    {
        this.state = state;
        this.action = action;
    }

    public ActionResult(Action action)
    {
        if (action == Action.Accept)
        {
            this.action = action;
        }
        else throw Exception();
    }
}

public class ParseTable
{
    public Dictionary<ActionInput, ActionResult> parseActions; 
}

public class GoToState {

}

public class SLRParser
{
    public Grammar grammar;
    public Grammar extendedGrammar;
    public ParseTable parseTable;
    public Dictionary<int, Symbol> states;
    public Dictionary<int, GoToState> goToStates;

    public SLRParser()
    {
        this.grammar = new Grammar();
        this.grammar.productions.Add(new Production("", ""));
        this.grammar.setTerminals(new string[] { "S", "e" });
        this.grammar.setNonTerminals(new string[] { "+", "-", "*", "/", "i", "(", ")" });
        this.grammar.precedenceRules.Add(new PrecedenceRule(Association.Left, new string[] { "+", "-" }));
        this.grammar.precedenceRules.Add(new PrecedenceRule(Association.Left, new string[] { "*", "/" }));
        this.grammar.precedenceRules.Add(new PrecedenceRule(Association.None, new string[] { "(", ")  " }));
    }

    // Each state in the LR(0) automaton represents a set of items in canonical LR(0) collection;
    // Canonical LR(0) collection provides the basis to create a DFA that makes parsing decisions (LR(0) automaton).

    //Precedence
    //The precedence of an operator determines how it nests with other operators. All the tokens declared in a single precedence declaration have equal precedence and nest together according to their associativity. 
    // When two tokens declared in different precedence declarations associate, the one declared later has the higher precedence and is grouped first.

    // Example used in GNU Bison (Yacc)
    // %left '<' '>' '=' "!=" "<=" ">="
    // %left '+' '-'
    // %left '*' '/'

    // This method is used to compute closure items for SLR parser.
    // The states of the LR(0) automaton correspond to sets of items


    public void setGoToStates()
    {

    }

    // This method is used to check whether a goToState exists in 
    public bool hasGoToState(List<LR0Item> items, Symbol symbol)
    {
        if (this.GOTO(items, symbol).GetType() == typeof(List<LR0Item>)) return true;
        return false;
    }

    //This method is used to return the id of a given GoToState
    public int getGoToStateId(GoToState goToState)
    {
        foreach (var state in this.goToStates)
        {
            if (state.Value == goToState) return state.Key;
        }
        return -1;
    }

    public List<LR0Item> closure(List<LR0Item> items)
    {
        foreach(LR0Item item in items)
        {
            foreach(Production production in this.grammar.productions)
            {
                if (!items.Contains(production))
                {
                    items.Add(new LR0Item(production));
                }
            }
        }
        return items;
    }

    // The GOTO function is used to defined the transitions of the LR(0) automaton for a grammar.
    // It specifies the transition from the state for I under input X.
    public List<LR0Item> GOTO(List<LR0Item> items, Symbol symbol)
    {
        List<LR0Item> processedItems = new List<LR0Item>();
        foreach (LR0Item item in items)
        {
            processedItems.Add(item.MoveDot());
        }
        return closure(processedItems);

    }

    public void setParsingTable(Grammar extendedGrammar)
    {
        Dictionary<int, List<LR0Item>> canonicalCollection = this.items(extendedGrammar);
        foreach(var itemsList in canonicalCollection)
        {
            foreach (LR0Item item in itemsList.Value)
            {
                if (item.hasTerminalAfterPosition(this.grammar.terminals.ToArray()) && this.hasGoToState(itemsList.Value, item.getTerminalAfterPosition(this.grammar.terminals.ToArray())))
                {
                    Symbol itemSymbol = item.getTerminalAfterPosition(this.grammar.terminals.ToArray());
                    int goToState = item.getGoToState();
                    this.parseTable.parseActions.Add(new ActionInput(itemsList.Key, itemSymbol), new ActionResult(goToState, Action.Shift));
                } else if (item.hasHandle(this.grammar.nonTerminals.ToArray())) {
                    Symbol itemSymbol = item.getNextSymbol();
                    this.parseTable.parseActions.Add(new ActionInput(itemsList.Key, itemSymbol), new ActionResult(item.reduceProduction(this.states), Action.Reduce));
                } else if (item.isFirstItemInExtendedGrammar(this.grammar.nonTerminals.ToArray())) {
                    Symbol itemSymbol = Symbol.getEndMarker();
                    this.parseTable.parseActions.Add(new ActionInput(itemsList.Key, itemSymbol), new ActionResult(Action.Accept));
                }
            }
        }
        
    }

    public Action ACTION(int state, Symbol symbol)
    {
        return Action.Shift;
    }

    // Algorithm to construct C (canonical collection of sets of LR(0) items for augmented grammar G'

    private Dictionary<int, List<LR0Item>> items(Grammar extendedGrammar)
    {
        Dictionary<int, List<LR0Item>> canonicalCollection = new Dictionary<int, List<LR0Item>>();
        List<LR0Item> closureItems = closure(extendedGrammar.productions.first());
        foreach (LR0Item item in closureItems)
        {
            foreach (Symbol symbol in this.grammar.getAllSymbols())
            {
                LR0Item toBeAdded = GOTO(item, symbol);
                if (!String.Empty(toBeAdded) && !closureItems.Contains(toBeAdded))
                {
                    closureItems.Add(toBeAdded);
                }
            }
        }
        return canonicalCollection;
    }

    public void parse(string word)
    {
        Symbol current = new Symbol(word[0].ToString());
        while(1)
        {
            int state = this.states.last();
            if (ACTION(state, current) == Action.Shift)
            {
                states.Push(t);
            } else if (ACTION(state, current) == Action.Reduce)
            {
                states.Push(t);
            } else if (ACTION(state, current) == Action.Accept) break;
            else ErrorRecovery();
        }
    }


    // This method 
    public List<Symbol> FOLLOW(Symbol symbol)
    {
        List<Symbol> followSet = new List<Symbol>();
        foreach (Production production in this.grammar.productions)
        {
            foreach(Symbol nonTerminal in this.grammar.nonTerminals)
            {
                foreach(List<Symbol> terminals in this.grammar.getTerminalPairs())
                {
                    List<Symbol> rhs = this.grammar.getTNTForm(terminals);
                    
                    if (production.hasForm(nonTerminal, rhs))
                    {
                        Symbol Bterminal = this.grammar.getMiddleTerminal(rhs, Form.TNT);
                        followSet.Add(this.FOLLOW(Bterminal), this.FIRST(terminals[1]));
                    }
                }
                
            }
        }
        return followSet;
    }

    public List<Symbol> FIRST(Symbol symbol) {

        List<Symbol> firstSet = new List<Symbol>();
        if (this.grammar.hasTerminal(symbol))
        {
            firstSet.Add(symbol);
        }

        foreach(Production production in this.grammar.productions)
        {
            Symbol symbol = this.grammar.getTerminalAfterNonTerminals(production);
            if (this.grammar.hasNonTerminal(symbol) && symbol != null) 
            {
                firstSet.Add(symbol);
            }
        }

        if (this.grammar.hasProduction(symbol.ToString(), Symbol.getEmptyWord().ToString()))
        {
            firstSet.Add(Symbol.getEmptyWord());
        }

        return firstSet;

    }
    public
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
                foreach(Symbol terminal in FIRST(symbols))
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
        foreach(LR1Item item in items)
        {
            processedItems.Add(item.MoveDot());
        }
        return closure(processedItems);

    }

    void items(Grammar extendedGrammar)
    {
        Dictionary<int, List<LR0Item>> canonicalCollection = new Dictionary<int, List<LR0Item>>();
        foreach (LR1Item item in closureItems) {
            foreach(GrammarSymbol symbol in grammar.symbols)
            {
                LR1Item toBeAdded = GOTO(item, symbol);
                if (!String.Empty(toBeAdded) && !closureItems.Contains(toBeAdded)){
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

namespace LRParser
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
        }
    }
}