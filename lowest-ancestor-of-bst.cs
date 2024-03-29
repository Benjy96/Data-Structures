/**

Performance test to compare non-caching solution against caching solution to recursive solution.

On a small tree, over 200,000 iterations:

Caching-Version Time: 86ms
Non-caching-Version Time: 174ms

*/

using System;
using System.Diagnostics;
using System.Collections.Generic;
					
public class Program
{
	public static void Main()
	{
		TreeNode n1 = new(5);
		TreeNode n2 = new(3);
		TreeNode n3 = new(0);
		TreeNode n4 = new(4){left=n2,right=n1};
		TreeNode n5 = new(7);
		TreeNode n6 = new(9);
		TreeNode n7 = new(7);
		TreeNode n8 = new(2){left=n3,right=n4};
		TreeNode n9 = new(8){left=n7,right=n6};
		TreeNode n10 = new(6){left=n8,right=n9};
		
		Stopwatch sw = new();
		Solution s = new();
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			s.LowestCommonAncestor(n10, n2, n1);	
		}
		sw.Stop();
		
		Console.WriteLine($"Caching-Version Time: {sw.Elapsed.Milliseconds}");
		
		sw.Reset();
		NoCacheSolution ncs = new();		
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			ncs.LowestCommonAncestor(n10, n2, n1);	
		}
		sw.Stop();
		
		Console.WriteLine($"Non-caching-Version Time: {sw.Elapsed.Milliseconds}");
	}
}

public class NoCacheSolution
{
	public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
		Console.WriteLine("P: " + p.val);
		Console.WriteLine("Q: " + q.val);
		return GetLCA(root, p.val, q.val);
	}

	public TreeNode GetLCA(TreeNode n, int p, int q)
	{
		if (n.val == p && IsValInTree(n.left, q)) return n;
		else if (n.val == p && IsValInTree(n.right, q)) return n;
		else if (n.val == q && IsValInTree(n.left, p)) return n;
		else if (n.val == q && IsValInTree(n.right, p)) return n;
		else if (IsValInTree(n.left, p) && IsValInTree(n.right, q)) return n;
		else if (IsValInTree(n.left, q) && IsValInTree(n.right, p)) return n;

		TreeNode lca;        
		if (n.left is not null)
		{
			lca = GetLCA(n.left, p, q);
			if (lca is not null) return lca;
		}

		if (n.right is not null)
		{
			lca = GetLCA(n.right, p, q);
			if (lca is not null) return lca;
		}

		return null;
	}

	public bool IsValInTree(TreeNode n, int target)
	{
		if (n is null) return false;
		else if (n.val == target) return true;
		else if (IsValInTree(n.left, target) || IsValInTree(n.right, target)) return true;
		else return false;
	}
}

/**
1. check left && right has repeatedly -> if left has & right has, is ancestor

2. check left || right has repeatedly -> if so, contained in this/below on either side
*/
public class Solution {
    public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        NodeCache nodeCache = new();
        return GetLCA(root, p.val, q.val, nodeCache);
    }

    // Repeatedly check if "this" node is LCA. LCA is when left AND right subtree contain one of each targets
    public TreeNode GetLCA(TreeNode n, int p, int q, NodeCache cache)
    {
        // Contained in this & left or right subtree? ("This" node can be the left or right)
        if (n.val == p && IsValInTree(n.left, q, cache)) return n;
        else if (n.val == p && IsValInTree(n.right, q, cache)) return n;
        else if (n.val == q && IsValInTree(n.left, p, cache)) return n;
        else if (n.val == q && IsValInTree(n.right, p, cache)) return n;
        // Contained in left && right subtree? (If "this" is not the left or right, left AND right must contain for this be ancestor)
        else if (IsValInTree(n.left, p, cache) && IsValInTree(n.right, q, cache)) return n;
        else if (IsValInTree(n.left, q, cache) && IsValInTree(n.right, p, cache)) return n;
        
        // This level of node not LCA, move down
        TreeNode lca;        
        if (n.left is not null)
        {
            lca = GetLCA(n.left, p, q, cache);
            if (lca is not null) return lca;
        }

        if (n.right is not null)
        {
            lca = GetLCA(n.right, p, q, cache);
            if (lca is not null) return lca;
        }

        // Ain't found shit
        return null;
    }

    public bool IsValInTree(TreeNode n, int target, NodeCache cache)
    {
        if (n is null) return false;
        else if (n.val == target) return true;
        else if (cache.TreeHas(n.left, target) || IsValInTree(n.left, target, cache)) 
        {
            cache.Add(n.left, target);
            return true;
        }
        else if (cache.TreeHas(n.right, target) || IsValInTree(n.right, target, cache))
        {
            cache.Add(n.right, target);
            return true;
        }
        else return false;
    }

    public class NodeCache
    {
        // int[] Will hold p or q against target if in children
        private readonly Dictionary<TreeNode, int[]> nodeVals;  

        public NodeCache()
        {
            nodeVals = new();
        }

        public void Add(TreeNode n, int valueContainedInSubtree)
        {
            if (!nodeVals.ContainsKey(n))
            {
                nodeVals.Add(n, new int[] { valueContainedInSubtree, -1 } );
            }
            else
            {
                if (nodeVals[n][1] == -1) nodeVals[n][1] = valueContainedInSubtree;
            }
        }

        public bool TreeHas(TreeNode n, int val)
        {
            if (n is not null && nodeVals.ContainsKey(n))
            {
                if (nodeVals[n][0] == val || nodeVals[n][1] == val) return false;
            }
            return false;
        }
    }
}

public class TreeNode
{
	public int val;
 	public TreeNode left;
 	public TreeNode right;
 	public TreeNode(int x) { val = x; }
}