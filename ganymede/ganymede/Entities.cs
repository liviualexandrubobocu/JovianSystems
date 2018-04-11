using System;

public enum Derivation
{
    None,
    Left,
    Right
}

public class Production
{
    public int Left { get; set; }
    public int[] Right { get; set; }
}

public class ProductionGroup
{
    public Derivation Derivation;
    public Production[] productions { get; set; }
}

public class Grammar
{
    public string[] Tokens { get; set; }
    public ProductionGroup[] ProductionGroups { get; set; }
}