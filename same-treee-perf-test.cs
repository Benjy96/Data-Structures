/**

2 versions of code to determine whether two trees are the same.

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
		Solution1 s1 = new();
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			s1.IsSameTree(n10, n10);
		}
		sw.Stop();
		
		Console.WriteLine($"Solution1 Time: {sw.Elapsed.Milliseconds}ms");
		
		sw.Reset();
		Solution2 s2 = new();		
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			s2.IsSameTree(n10, n10);
		}
		sw.Stop();
		
		Console.WriteLine($"Solution2 Time: {sw.Elapsed.Milliseconds}ms");
	}
}

public class Solution1 {
    public bool IsSameTree(TreeNode p, TreeNode q) {
        return SameTrees(p, q);
    }

    bool SameTrees(TreeNode n1, TreeNode n2)
    {
        if (n1 is null && n2 is null) return true;
        if (n1 is null && n2 is not null) return false;
        if (n2 is null && n1 is not null) return false;
        if (n1 is not null && n2 is not null && n1.val != n2.val) return false;

        return SameTrees(n1.left, n2.left) && SameTrees(n1.right, n2.right);
    }
}

public class Solution2 {
    public bool IsSameTree(TreeNode p, TreeNode q) {
        List<TreeNode> pNodes = new();
        TraverseAndStore(p, pNodes);

        List<TreeNode> qNodes = new();
        TraverseAndStore(q, qNodes);

        if (pNodes.Count != qNodes.Count) return false;

        int qN = 0;
        foreach(TreeNode pN in pNodes)
        {
            if (pN is null && qNodes[qN] is not null) return false;
            if (qNodes[qN] is null && pN is not null) return false;
            if (pN is not null && qNodes[qN] is not null && pN.val != qNodes[qN].val) return false;
            qN++;
        }
        return true;
    }

    void TraverseAndStore(TreeNode n, List<TreeNode> nodes)
    {
        nodes.Add(n);

        if (n is not null)
        {
            TraverseAndStore(n.left, nodes);
            TraverseAndStore(n.right, nodes);
        }
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