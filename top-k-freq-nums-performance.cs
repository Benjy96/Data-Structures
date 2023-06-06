/**

Solution1 (Dict->Sort->Select->Take) Time: 176ms
Solution2 (Dict->Sort->Take-Select) Time: 153ms
Solution3 (GroupBy->Sort->Take->Select) Time: 195ms

*/

using System;
using System.Diagnostics;
using System.Collections.Generic;
using System.Linq;
					
public class Program
{
	public static void Main()
	{
		int[] nums = { 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,3,3,4 };
		int k = 2;
		
		Stopwatch sw = new();
		Solution1 s1 = new();
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			s1.TopKFrequent(nums, k);
		}
		sw.Stop();
		
		Console.WriteLine($"Solution1 (Dict->Sort->Select->Take) Time: {sw.Elapsed.Milliseconds}ms");
		
		sw.Reset();
		Solution2 s2 = new();		
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			s2.TopKFrequent(nums, k);
		}
		sw.Stop();
		
		Console.WriteLine($"Solution2 (Dict->Sort->Take-Select) Time: {sw.Elapsed.Milliseconds}ms");
		
		sw.Reset();
		Solution3 s3 = new();		
		
		sw.Start();
		for(int i = 0; i < 100000; i++)
		{
			s3.TopKFrequent(nums, k);
		}
		sw.Stop();
		
		Console.WriteLine($"Solution3 (LINQ GroupBy->Sort->Take->Select) Time: {sw.Elapsed.Milliseconds}ms");
	}
}

public class Solution1 {
    public int[] TopKFrequent(int[] nums, int k) {
        Dictionary<int, int> numFreqs = new();
        for(int i = 0; i < nums.Length; i++)
        {
            if (!numFreqs.ContainsKey(nums[i])) numFreqs.Add(nums[i], 1);
            else numFreqs[nums[i]]++;
        }

        var sortedFreqNums = numFreqs.OrderByDescending(kv => kv.Value).Select(kv => kv.Key);
        
        return sortedFreqNums.Take(k).ToArray();
    }
}

public class Solution2 {
    public int[] TopKFrequent(int[] nums, int k) {
        Dictionary<int, int> numFreqs = new();
        for(int i = 0; i < nums.Length; i++)
        {
            if (!numFreqs.ContainsKey(nums[i])) numFreqs.Add(nums[i], 1);
            else numFreqs[nums[i]]++;
        }

        var sortedFreqNums = numFreqs.OrderByDescending(kv => kv.Value).Take(k).Select(kv => kv.Key);
        return sortedFreqNums.ToArray();
    }
}

public class Solution3
{
    public int[] TopKFrequent(int[] nums, int k) 
    {
        return nums.GroupBy(num => num)
        .OrderByDescending(num => num.Count())
        .Take(k)
        .Select(c => c.Key)
        .ToArray();
    }
}
