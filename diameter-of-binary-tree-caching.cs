using System;
using System.Diagnostics;
using System.Collections.Generic;
					
/**
Caching Version: 11ms
Non-caching Version: 67ms
*/
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
		Solution1 s1 = new();
		
		sw.Start();
		for(int i = 0; i < 200000; i++)
		{
			s1.DiameterOfBinaryTree(n10);
		}
		sw.Stop();
		
		Console.WriteLine($"Solution1 (Caching) Time: {sw.Elapsed.Milliseconds}ms");
		
		sw.Reset();
		Solution2 s2 = new();		
		
		sw.Start();
		for(int i = 0; i < 200000; i++)
		{
			s2.DiameterOfBinaryTree(n10);
		}
		sw.Stop();
		
		Console.WriteLine($"Solution2 (No Caching) Time: {sw.Elapsed.Milliseconds}ms");
	}
}

public class Solution1 {
    Dictionary<TreeNode, int> maxPaths = new();

    public int DiameterOfBinaryTree(TreeNode root) {
        if (root is null) return 0;
        if (maxPaths.ContainsKey(root)) return maxPaths[root];

        int thisNodeMaxDepth = MaxDepth(root.left, 0) + MaxDepth(root.right, 0);
        
        int lMax = Math.Max(thisNodeMaxDepth, DiameterOfBinaryTree(root.left));
        int longestPath = Math.Max(lMax, DiameterOfBinaryTree(root.right));
        
        maxPaths.Add(root, longestPath);
        return longestPath;
    }

    public int MaxDepth(TreeNode n, int depth)
    {
        if (n is not null)
        {
            int lMax = MaxDepth(n.left, depth+1);
            int rMax = MaxDepth(n.right, depth+1);
            int max = lMax > rMax ? lMax : rMax;

            return max;
        }
        else return depth;
    }
}

public class Solution2 {
    public int DiameterOfBinaryTree(TreeNode root) {
        if (root is null) return 0;
        int thisNodeMaxPath = MaxDepth(root.left, 0) + MaxDepth(root.right, 0);
        
        int lMax = Math.Max(thisNodeMaxPath, DiameterOfBinaryTree(root.left));
        int max = Math.Max(lMax, DiameterOfBinaryTree(root.right));
        return max;
    }

    public int MaxDepth(TreeNode n, int depth)
    {
        if (n is not null)
        {
            int lMax = MaxDepth(n.left, depth+1);
            int rMax = MaxDepth(n.right, depth+1);
            return lMax > rMax ? lMax : rMax;
        }
        else return depth;
    }
}

public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}