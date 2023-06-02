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
		Stopwatch sw = new();
		Solution1 s = new();
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			// s1.
		}
		sw.Stop();
		
		Console.WriteLine($"Solution1 Time: {sw.Elapsed.Milliseconds}");
		
		sw.Reset();
		Solution2 s2 = new();		
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			// s2.
		}
		sw.Stop();
		
		Console.WriteLine($"Solution2 Time: {sw.Elapsed.Milliseconds}");
	}
}

public class Solution1
{
	
}

public class Solution2
{
    
}
