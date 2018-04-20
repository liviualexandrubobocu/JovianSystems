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

    public Symbol getSymbolicLHS()
    {
        return new Symbol(this.lhs);
    }

    public Symbol getSymbolicRHS()
    {
        return new Symbol(this.rhs);
    }
}

public abstract class LRItem
{
    public int uid;
    public int productionId;
    public int position;
    public Production production;

    public abstract bool hasTerminalAfterPosition(Symbol[] terminals);

    public abstract bool hasHandle(Symbol[] nonTerminals);

    public abstract void updatePosition();
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

    public Symbol getSymbolAfterPosition()
    {
        if (this.position + 1 <= this.production.rhs.Length)
            return new Symbol(this.production.rhs[this.position + 1].ToString());
        else return Symbol.getEndMarker();
    }

    public override void updatePosition()
    {
        this.position++;
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
    void derive();
    void isOfType();
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

    public void isOfType()
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
        bool foundTerminal = false;
        int k = 0;
        Symbol terminal = null;
        foreach(char character in production.rhs)
        {
            Symbol symbol = new Symbol(character.ToString());
            if (this.hasTerminal(symbol))
            {
                foundTerminal = true;
                terminal = symbol;
                break;
            }
            k++;
        }
         
        if (foundTerminal == false) return null;
        
        for(int j = 0; j < k; j++)
        {
            string lhs = production.rhs[j].ToString();
            if (!this.hasProduction(lhs, Symbol.getEmptyWord().ToString()))
            {
                return null;
            } 
        }
        return terminal;
    }

    public Symbol getMiddleTerminal(string rhs, Form form)
    {
        if(form == Form.TNT)
        {
            string terminal = rhs[1].ToString();
            return new Symbol(terminal);
        }
        return null;
    }

    // Returns a list of pairs from grammar terminals
    public List<Tuple<Symbol, Symbol>> getTerminalPairs()
    {
        List<Tuple<Symbol, Symbol>> terminalPairs = new List<Tuple<Symbol, Symbol>>();
        Symbol[] terminalsArray = this.terminals.ToArray();
        int i = 0;
        foreach(Symbol symbol in this.terminals)
        {
            for (int j = i; j < terminalsArray.Length; j++) {
                terminalPairs.Add(Tuple.Create(symbol, terminalsArray[j]));
            }
            i++;
        }
        return terminalPairs;
    }

    //This method is used to get a TNT string form of 2 terminals and a nonTerminal
    public string getForm(Tuple<Symbol, Symbol> terminals, Symbol nonTerminal, string form)
    {
        if (form.Equals("TNT"))
        {
            return terminals.Item1.ToString() + nonTerminal.ToString() + terminals.Item2.ToString();
        }
        return String.Empty;
    }

    //This method is used to get a NT string form of a nonTerminal and a terminal
    public string getForm(Symbol terminal, Symbol nonTerminal, string form)
    {
        if (form.Equals("TN"))
        {
            return terminal.ToString() + nonTerminal.ToString();
        }
        return String.Empty;
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

public enum Form
{
    TNT,
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

public class FollowSet
{
    public Symbol NonTerminal { get; set; }
    public List<Symbol> Terminals { get; set; }
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

    public GoToState getGoToState(int itemId)
    {
        return this.goToStates[itemId];
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
            item.updatePosition();
            processedItems.Add(item);
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
                    GoToState goToState = this.getGoToState(item.uid);
                    int goToStateId = this.getGoToStateId(goToState);
                    this.parseTable.parseActions.Add(new ActionInput(itemsList.Key, itemSymbol), new ActionResult(goToStateId, Action.Shift));
                } else if (item.hasHandle(this.grammar.nonTerminals.ToArray())) {
                    Symbol itemSymbol = item.getSymbolAfterPosition();
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
        List<Production> takeClosureOf = new List<Production>();
        takeClosureOf.Add(extendedGrammar.productions[0]);
        List<List<LR0Item>> closureItems = closure(takeClosureOf);
        foreach (List<LR0Item> itemsList in closureItems)
        {
            foreach (Symbol symbol in this.grammar.getAllSymbols())
            {
                List<LR0Item> toBeAdded = GOTO(itemsList, symbol);
                if (toBeAdded != null && !closureItems.Contains(toBeAdded))
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


    // This method is used to define follow set algorithm.
    public FollowSet FOLLOW(Symbol symbol)
    {
        FollowSet followSetBNonTerminal = new FollowSet();
        foreach (Production production in this.grammar.productions)
        {
            foreach(Symbol nonTerminal in this.grammar.nonTerminals)
            {
                foreach(Tuple<Symbol, Symbol> terminals in this.grammar.getTerminalPairs())
                {
                    string TNTRHS = this.grammar.getForm(terminals, nonTerminal, "TNT");
                    string TNRHS = this.grammar.getForm(terminals.Item1, nonTerminal, "TN");

                    if (nonTerminal.ToString().Equals(TNTRHS))
                    {
                        followSetBNonTerminal.NonTerminal = nonTerminal;
                        followSetBNonTerminal.Terminals = this.FIRST(terminals.Item2);
                    }
                    
                    if (nonTerminal.ToString().Equals(TNRHS) || (nonTerminal.ToString().Equals(TNTRHS) && this.FIRST(terminals.Item2).Contains(Symbol.getEmptyWord())))
                    {
                        this.addSet(this.FOLLOW(terminals.Item2), this.FOLLOW(production.getSymbolicLHS()));
                        
                    }
                }
            }
        }

        return followSetBNonTerminal;
    }


    //This method is used to add elements between follow sets
    public void addSet(FollowSet source, FollowSet target)
    {
        foreach(Symbol terminal in source.Terminals)
        {
            target.Terminals.Add(terminal);
        }
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